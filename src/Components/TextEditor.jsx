import { useState, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

// Register image resize module
Quill.register('modules/imageResize', ImageResize);


function TextEditor() {
  const [value, setValue] = useState('');
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  };

  const formats = [
    'font', 'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align'
  ];

  useEffect(() => {
    const savedDocument = localStorage.getItem('document');
    if (savedDocument) {
      setValue(savedDocument);
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().root.classList.add('ql-custom-fonts');
    }
  }, [quillRef]);

  return (
    <div className='main-editor'>
      <ReactQuill ref={quillRef} value={value} onChange={setValue} modules={modules} formats={formats} />
    </div>
  );
}

export default TextEditor;
