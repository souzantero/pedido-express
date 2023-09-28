import { v4 } from 'uuid';
import { Identifier } from '../../core/application';

export class UuidAdapter implements Identifier {
  generate(): string {
    return v4();
  }
}
