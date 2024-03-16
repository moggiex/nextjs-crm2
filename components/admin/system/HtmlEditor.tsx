import React, { useState } from 'react';
import { Textarea } from '@nextui-org/react';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const HtmlEditor = ({ htmlBody }) => {
	const [content, setContent] = useState(htmlBody);

	const quillModules = {
		toolbar: [
			[{ header: [1, 2, 3, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			[{ align: [] }],
			[{ color: [] }],
			['code-block'],
			['clean'],
		],
	};

	const quillFormats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'link',
		'image',
		'align',
		'color',
		'code-block',
	];

	const handleEditorChange = newContent => {
		setContent(newContent);
	};

	return (
		<div className="w-full h-96">
			<QuillEditor
				name="htmlBody"
				value={content}
				onChange={handleEditorChange}
				modules={quillModules}
				formats={quillFormats}
				className="w-full h-[70%] mt-10 bg-white"
			/>
		</div>
	);
};

export default HtmlEditor;
