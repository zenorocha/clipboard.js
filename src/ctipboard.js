 import Clipboard from './clipboard';

/**
 * Extends Clipboard with bootstrap tooltip support
 */
class Ctipboard extends Clipboard {
  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger - triggering elements
   * @param {Object} options         - Passed forward to Clipboard
   * @param {Object} options.tooltip - Bootstrap tooltips options to be pass on
   * @param {Object} options.tooltip.delay.wait - Additional time to wait between the tooltips `show` and `hide` steps
   */
  constructor(trigger, options) {
    super(trigger, options);

    let self = this;

    // monkey out
    let onClickOld = self.onClick;
    let onClick = (e)=>{
      // capture before ClipboardAction fires `success` w/o this.clipboardAction around to grab the orginating event/element
      self.triggering = e.delegateTarget || e.currentTarget;
      self.onClick = onClickOld; // monkey out
      self.onClick(e); // resume
      self.onClick = onClick; // monkey in
    }
    self.onClick = onClick; // monkey in

    // handle showing and hiding of the tooltip
    self.on('success', ()=>{
      options = options || {};

      let settings = $.extend(
        true, 
        {
          placement: 'bottom',
          trigger: 'click', 
          title: 'Copied',
          delay: { "show": 500, "wait": 1000, "hide": 500 },
        },
        // pass to bootstraps $.tooltip: https://bootstrapdocs.com/v3.3.5/docs/javascript/#tooltips-options
        options.tooltip
      );

      $(self.triggering).tooltip(settings).on('shown.bs.tooltip', (e)=>{
        let tooltip = e.delegateTarget || e.currentTarget
        self.emit('ctipboard.toolip.shown', tooltip);
        setTimeout(()=>{
          $(tooltip).tooltip('hide');
        }, settings.delay.wait); // hold for 1s
      }).on('hidden.bs.tooltip', (e)=>{
        let tooltip = e.delegateTarget || e.currentTarget
        self.emit('ctipboard.toolip.hidden', tooltip);
        $(tooltip).tooltip('destroy');
      }).tooltip('show');
    });
  }
}

module.exports = Ctipboard;
