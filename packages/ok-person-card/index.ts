import { defineComponent, html } from 'ok-lit'

import okPersonCard from '../assets/ok-person-card.less'

/**
 *
 */

defineComponent('ok-person-card', () => {
  return () => html`
    <style>
      ${okPersonCard}
    </style>
    <ok-popover>
      <slot>
        <ok-persn class="cell"></ok-persn>
      </slot>
      <ok-person-detail slot="popover"></ok-person-detail>
    </ok-popover>
  `
})
