import React from 'react';

const EditLink = ({ className, filePath, children }) => {
  const editUrl = `https://github.com/sassy-labs/datepicker/tree/main/docs/${filePath}`;

  return (
    <a href={editUrl} rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default EditLink;
