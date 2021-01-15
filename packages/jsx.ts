import { Person } from './ok-person/person.utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ok-person': OkPersonAttributes
      'ok-person-detail': OkPersonDetailAttributes
    }

    interface OkPersonAttributes {
      person: Person
      size: Number
      zIndex: String
    }

    interface OkPersonDetailAttributes {
      person: Person
    }
  }
}
