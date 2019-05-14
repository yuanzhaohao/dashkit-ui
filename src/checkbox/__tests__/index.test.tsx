import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Checkbox from '../index';
const CheckboxGroup = Checkbox.Group;

describe('CheckboxGroup', () => {
  it('correctly sets "checked" attribute', () => {
    expect(
      renderer
        .create(
          <CheckboxGroup value={['1', '2']}>
            <Checkbox value="1" />
            <Checkbox value="3" />
          </CheckboxGroup>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it('renders correctly when deeply nested', () => {
    expect(
      renderer
        .create(
          <CheckboxGroup name="test" value={['1', '2']}>
            <div>
              <div>
                <Checkbox value="1" />
                <Checkbox value="3" />
              </div>
            </div>
          </CheckboxGroup>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });
});
