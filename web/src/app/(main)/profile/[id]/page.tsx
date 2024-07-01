import React from 'react';

const ProfileId = ({ params }: { params: { id: number } }) => {
	return <div>Profile id {params.id}</div>;
};

export default ProfileId;
