import React from 'react';

const PostId = ({ params }: { params: { id: number } }) => {
	return <div>PostId {params.id}</div>;
};

export default PostId;
