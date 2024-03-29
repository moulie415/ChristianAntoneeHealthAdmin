import {MutableRefObject} from 'react';
import moment from 'moment';

const getEducationCategoryString = (category: string) => {
  switch (category) {
    case 'exercise':
      return 'Exercise Articles';
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
}: {
  image: string;
  title: string;
  createdate: string;
  category: string;
  body: string;
  editorRef?: MutableRefObject<any>;
}) {
  return (
    <div>
      <div style={{fontWeight: 'bold', marginBottom: 5}}>
        Preview (rough estimate, varies based off device resolution)
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
