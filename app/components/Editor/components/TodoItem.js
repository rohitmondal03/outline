// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { color } from 'shared/styles/constants';
import type { props } from 'slate-prop-types';

export default class TodoItem extends Component {
  props: props & { checked: boolean };

  handleChange = (ev: SyntheticInputEvent) => {
    const checked = ev.target.checked;
    const { editor, node } = this.props;
    const change = editor
      .getState()
      .change()
      .setNodeByKey(node.key, { data: { checked } });

    editor.onChange(change);
  };

  render() {
    const { children, checked, attributes, readOnly } = this.props;

    return (
      <ListItem checked={checked} {...attributes}>
        <Input
          type="checkbox"
          checked={checked}
          onChange={this.handleChange}
          disabled={readOnly}
          contentEditable={false}
        />
        {children}
      </ListItem>
    );
  }
}

const ListItem = styled.li`
  padding-left: 1.4em;
  position: relative;

  > p > span {
    color: ${props => (props.checked ? color.slateDark : 'inherit')};
    text-decoration: ${props => (props.checked ? 'line-through' : 'none')};
  }
`;

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0.4em;
`;
