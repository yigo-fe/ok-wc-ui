import { Person } from './ok-person-cell/person-cell.utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ok-person-cell': OkPersonCellAttributes
      'ok-person-detail': OkPersonDetailAttributes
    }

    interface OkPersonCellAttributes {
      person: Person
      size: Number
      zIndex: String
    }

    interface OkPersonDetailAttributes {
      person: Person
    }
  }
}
