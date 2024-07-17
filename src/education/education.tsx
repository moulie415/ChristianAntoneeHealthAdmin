import {Editor} from '@tinymce/tinymce-react';
import {useCallback, useRef} from 'react';
import {
  BooleanField,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  List,
  ResourceProps,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  required,
  useRecordContext,
} from 'react-admin';
import {useController} from 'react-hook-form';
import EducationArticlePreview from './EducationArticlePreview';

export const EducationList = (props: ResourceProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <ChipField source="category" />
      <BooleanField source="premium" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

const CustomBodyField = () => {
  const record = useRecordContext();
  return (
    <EducationArticlePreview
      key="preview"
      image={record?.image?.src}
      title={record?.title}
      body={record?.body}
      createdate={record?.createdate}
      category={record?.category}
    />
  );
};

const CustomBodyInput = () => {
  const record = useRecordContext();

  const editorRef = useRef<any>(null);

  const {field} = useController({name: 'body'});

  const onEditorChange = useCallback(() => {
    if (editorRef.current) {
      field.onChange(editorRef.current.getContent());
    }
  }, [field]);

  return (
    <div style={{display: 'flex'}}>
      <Editor
        key="editor"
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        onInit={(_, editor) => (editorRef.current = editor)}
        initialValue={record?.body}
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
      <div style={{width: 20}} />
      <EducationArticlePreview
        key="preview"
        image={record?.image?.src}
        body={record?.body}
        editorRef={editorRef}
        title={record?.title}
        createdate={record?.createdate}
        category={record?.category}
      />
    </div>
  );
};

export const EducationShow = (props: ResourceProps) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="title" />
        <ChipField source="category" />
        <ImageField source="image.src" />
        <BooleanField source="premium" />
        <CustomBodyField />
      </SimpleShowLayout>
    </Show>
  );
};

export const EducationCreate = (props: ResourceProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput validate={[required()]} source="title" />
        <SelectInput
          validate={[required()]}
          source="category"
          choices={[
            {id: 'exercise', name: 'Exercise Articles'},
            {id: 'general', name: 'General Lifestyle'},
            {id: 'nutritional', name: 'Nutritional Info'},
          ]}
        />
        <ImageInput
          validate={[required()]}
          source="image"
          label="Image"
          accept={{'image/*': ['.jpeg', '.png']}}>
          <ImageField source="src" title="title" />
        </ImageInput>
        <CustomBodyInput />
        <BooleanInput source="premium" />
      </SimpleForm>
    </Create>
  );
};

export const EducationEdit = (props: ResourceProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput
        source="category"
        choices={[
          {id: 'exercise', name: 'Exercise Articles'},
          {id: 'general', name: 'General Lifestyle'},
          {id: 'nutritional', name: 'Nutritional Info'},
        ]}
      />
      <ImageInput
        source="image"
        label="Image"
        accept={{'image/*': ['.jpeg', '.png']}}>
        <ImageField source="src" title="title" />
      </ImageInput>
      <CustomBodyInput />
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
