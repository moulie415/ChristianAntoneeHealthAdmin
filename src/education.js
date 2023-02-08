import {RichTextInput} from 'ra-input-rich-text';
import React, {useMemo, useState} from 'react';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  ImageInput,
  ImageField,
  SimpleShowLayout,
  BooleanField,
  BooleanInput,
  TextField,
  ChipField,
  TextInput,
  SimpleForm,
  ShowButton,
  EditButton,
  DeleteButton,
  SelectInput,
  useRecordContext,
  useInput,
  RichTextField,
  required,
} from 'react-admin';
import {useController} from 'react-hook-form';
import {Editor} from '@tinymce/tinymce-react';
import {useRef} from 'react';
import EducationArticlePreview from './EducationArticlePreview';
import {useCallback} from 'react';

export const EducationList = props => (
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

  const editorRef = useRef(null);

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
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={record?.body}
        onEditorChange={onEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'a11ychecker',
            'advlist',
            'advcode',
            'advtable',
            'autolink',
            'checklist',
            'export',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'powerpaste',
            'fullscreen',
            'formatpainter',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | casechange blocks | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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

export const EducationShow = props => {
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

export const EducationCreate = props => {
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
          accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        {/* <RichTextInput
          validate={[required()]}
          source="body"
          multiline
          fullWidth
        /> */}
        <CustomBodyInput />
        <BooleanInput source="premium" />
      </SimpleForm>
    </Create>
  );
};

export const EducationEdit = props => (
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
      <ImageInput source="image" label="Image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      {/* <RichTextInput source="body" multiline fullWidth /> */}
      <CustomBodyInput />
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
