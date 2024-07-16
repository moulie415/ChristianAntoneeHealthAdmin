import {Typography} from '@mui/material';
import {Editor} from '@tinymce/tinymce-react';
import {useCallback, useRef} from 'react';
import {useRecordContext} from 'react-admin';
import {useController} from 'react-hook-form';

const UserNotes = () => {
  const record = useRecordContext();

  const editorRef = useRef<any>(null);

  const {field} = useController({name: 'notes'});

  const onEditorChange = useCallback(() => {
    if (editorRef.current) {
      field.onChange(editorRef.current.getContent());
    }
  }, [field]);

  return (
    <div style={{width: '100%', marginBottom: 20}}>
      <Typography variant="h6" gutterBottom>
        Notes
      </Typography>
      <Editor
        key="editor"
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        onInit={(_, editor) => (editorRef.current = editor)}
        initialValue={record?.notes}
        onEditorChange={onEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | casechange blocks | fontsizeselect fontselect forecolor backcolor bold italic lineheight | \
alignleft aligncenter alignright alignjustify | \
bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          line_height_formats:
            '8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt',
        }}
      />
    </div>
  );
};

export default UserNotes;
