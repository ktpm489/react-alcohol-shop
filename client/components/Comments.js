import React from 'react';

const Comments = ({ comment, commentName, delComment }) => {
  console.log(commentName);
  console.log(comment);
  return (
    <div className='comment'>
      <div className='row'>
        <div className='col-xs-2'>
          <div className='avatar'></div>
        </div>
        <div className='col-xs-10 pl-small'>
          <h5 className='name'>{commentName}</h5>
          <p className='content'>
            <button onClick={delComment} className='delete'>
              <i className='ion-android-close'></i>
            </button>
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
