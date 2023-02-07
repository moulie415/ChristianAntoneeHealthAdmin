import {useRecordContext} from 'ra-core';
import React from 'react';
import moment from 'moment';

export const getEducationCategoryString = category => {
  switch (category) {
    case 'exercise':
      return 'Education Articles';
    case 'nutritional':
      return 'Nutritional Info';
    default:
      return 'General Lifestyle';
  }
};

function EducationArticlePreview({
  image,
  title,
  editorRef,
  createdate,
  category,
  body,
}) {
  return (
    <div>
      <div style={{fontWeight: 'bold', marginBottom: 5}}>
        Preview (very rough, check in app once finished)
      </div>

      <div
        style={{
          height: 640,
          width: 360,
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}>
        <img
          src={image}
          height={270}
          width="100%"
          style={{marginBottom: 10, objectFit: 'cover'}}
        />
        <div
          style={{
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -35,
            backgroundColor: '#fff',
            position: 'relative',
            zIndex: 2,
          }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            {title}
          </div>
          <div style={{fontSize: 12}}>{`${moment(createdate).format(
            'DD MMMM YYYY',
          )}   |   ${getEducationCategoryString(category)}`}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: editorRef?.current?.getContent() || body,
            }}></div>
        </div>
      </div>
    </div>
  );
}

export default EducationArticlePreview;
