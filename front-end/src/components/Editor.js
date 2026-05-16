import React, { useState, useEffect } from 'react';
import { getAllDocuments, createDocument, updateDocument, deleteDocument } from '../api/documents';

function Editor() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const response = await getAllDocuments();
    setDocuments(response.data);
  };

  const handleNew = async () => {
    const doc = await createDocument({ title: '새 문서', content: '' });
    await loadDocuments();
    handleSelect(doc.data);
  };

  const handleSelect = (doc) => {
    setSelectedDoc(doc);
    setTitle(doc.title);
    setContent(doc.content);
  };

  const handleSave = async () => {
    await updateDocument(selectedDoc.id, { title, content });
    await loadDocuments();
    alert('저장되었습니다!');
  };

  const handleDelete = async (id) => {
    await deleteDocument(id);
    setSelectedDoc(null);
    setTitle('');
    setContent('');
    await loadDocuments();
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '16px' }}>
        <h3>문서 목록</h3>
        <button onClick={handleNew}>+ 새 문서</button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {documents.map(doc => (
            <li key={doc.id} style={{ marginTop: '8px' }}>
              <span onClick={() => handleSelect(doc)} style={{ cursor: 'pointer' }}>
                {doc.title}
              </span>
              <button onClick={() => handleDelete(doc.id)} style={{ marginLeft: '8px' }}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: '16px' }}>
        {selectedDoc ? (
          <>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', fontSize: '24px', marginBottom: '16px' }}
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{ width: '100%', height: '80%', fontSize: '16px' }}
            />
            <button onClick={handleSave}>저장</button>
          </>
        ) : (
          <p>왼쪽에서 문서를 선택하거나 새 문서를 만들어 주세요.</p>
        )}
      </div>
    </div>
  );
}

export default Editor;