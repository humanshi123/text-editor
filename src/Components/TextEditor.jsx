import { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

// Add custom font to the whitelist and register it
const Font = Quill.import('formats/font');
Font.whitelist = [
  'SharpSansMediumItalic', 
  'SharpSansExtrabold', 
  'SharpSansBold', 
  'AcuminProCondBookItalic', 
  'HelveticaNeueCondensedBlack', 
  'ABCReproRegular'
];
Quill.register(Font, true);

function TextEditor() {
  const [value, setValue] = useState('');

  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'font': Font.whitelist }],
      [{ 'header': '1' }, { 'header': '2' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
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

  const saveDocument = () => {
    localStorage.setItem('document', value);
  };

  useEffect(() => {
    const savedDocument = localStorage.getItem('document');
    if (savedDocument) {
      setValue(savedDocument);
    }
  }, []);

  return (
    <div className='main-editor'>
      <ReactQuill ref={quillRef} value={value} onChange={setValue} modules={modules} formats={formats} />
      <div className='main-button text-center'>
        <button className='font-[ABCReproRegular] bg-[#93dce79c]' onClick={saveDocument}>Save Document</button>
      </div>
    </div>
  );
}

export default TextEditor;
