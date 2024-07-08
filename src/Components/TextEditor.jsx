import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { useDropzone } from 'react-dropzone';
import PageLayoutSettings from './PageLayoutSettings';

Quill.register('modules/imageResize', ImageResize);

function TextEditor() {
  const [value, setValue] = useState('');
  const [layoutSettings, setLayoutSettings] = useState({
    pageSize: 'A4',
    orientation: 'portrait',
    margin: 20
  });

  const quillRef = useRef(null);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
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
    'header', 'font', 'size',
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

  const handleSettingsChange = (settings) => {
    setLayoutSettings(settings);
  };

  const content = value.split('<div class="page-break"></div>').map((page, index) => (
    <div key={index} className="page" style={{
      height: layoutSettings.pageSize === 'A4' ? '297mm' : layoutSettings.pageSize === 'Letter' ? '279mm' : '356mm',
      width: layoutSettings.orientation === 'portrait' ? '210mm' : '297mm',
      margin: `${layoutSettings.margin}px`,
    }} dangerouslySetInnerHTML={{ __html: page }} />
  ));

  return (
    <div className='main-editor'>
      <PageLayoutSettings onSettingsChange={handleSettingsChange} />
      <ReactQuill ref={quillRef} value={value} onChange={setValue} modules={modules} formats={formats} />
     <div className='main-button text-center'>
     <button className='bg-[#93dce79c]' onClick={saveDocument}>Save Document</button>
     </div>
      <div>
        {content}
      </div>
    </div>
  );
}

export default TextEditor;
