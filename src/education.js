import {RichTextInput} from 'ra-input-rich-text';
import React, {useState} from 'react';
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
} from 'react-admin';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useController} from 'react-hook-form';

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
  const {body} = useRecordContext();
  return (
    <>
      <p
        style={{
          fontSize: '0.75em',
          fontFamily: 'Roboto, Helvetica,Arial,sans-serif',
          color: 'rgba(0,0,0,0.6)',
        }}>
        Body
      </p>
      <div dangerouslySetInnerHTML={{__html: body}}></div>
    </>
  );
};

const CustomBodyInput = () => {
  const record = useRecordContext();
  const body = record?.body;

  const {field} = useController({name: 'body'});

  const getStateFromBody = () => {
    const blocksFromHTML = convertFromHTML(body);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    return EditorState.createWithContent(state);
  };

  const [editorState, setEditorState] = useState(
    body ? getStateFromBody() : EditorState.createEmpty(),
  );
  return (
    <div
      style={{
        border: '1px solid rgba(0, 0, 0, 0.23)',
        padding: 10,
        borderRadius: 5,
      }}>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={state => {
          field.onChange(
            draftToHtml(convertToRaw(editorState.getCurrentContent())),
          );
          setEditorState(state);
        }}
        placeholder="Enter content here..."
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
        <RichTextField source="body" />
      </SimpleShowLayout>
    </Show>
  );
};

export const EducationCreate = props => {
  return (
    <Create {...props}>
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
        <RichTextInput source="body" multiline />
        {/* <CustomBodyInput /> */}
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
      <RichTextInput source="body" multiline />
      {/* <CustomBodyInput /> */}
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
