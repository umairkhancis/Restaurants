import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FontIcon } from '@shoutem/react-web-ui';
import './style.scss';

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.stopPropagation();
  }

  render() {
    const {
      src,
      width,
      height,
      className,
      canBeDeleted,
      onDeleteClick,
    } = this.props;

    const classes = classNames(
      className,
      'image-preview',
      {
        'is-deletable': canBeDeleted,
      },
    );

    const style = { width, height };
    if (!!src) {
      style.backgroundImage = `url('${src}')`;
    }

    return (
      <div
        className={classes}
        onClick={this.handleClick}
        style={style}
      >
        {canBeDeleted && (
          <FontIcon
            className="file-preview__delete"
            name="delete"
            onClick={onDeleteClick}
          />
        )}
      </div>
    );
  }
}

ImagePreview.propTypes = {
  /**
   * Valid url to the file
   */
  src: PropTypes.string.isRequired,
  /**
   * Additional classes to apply
   */
  className: PropTypes.string,
  /**
   * Click handler for delete icon
   */
  onDeleteClick: PropTypes.func,
  /**
   * Flag indicating whether file can be deleted
   */
  canBeDeleted: PropTypes.bool,
  /**
   * Preview width
   */
  width: React.PropTypes.string,
  /**
   * Preview height
   */
  height: React.PropTypes.string,
};

ImagePreview.defaultProps = {
  width: '150px',
  height: '150px',
};
