import React from 'react';
import CredentialCard from './CredentialCard';

const CredentialList = ({ credentials, searchQuery, onEdit, onDelete }) => {
const filteredCredentials = credentials.filter((cred) =>
cred.website.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
<div className="mt-6 space-y-4">
    {filteredCredentials.length === 0 ? (
    <p className="text-center text-gray-500">No credentials found.</p>
    ) : (
    filteredCredentials.map((credential) => (
        <CredentialCard
        key={credential.id}
        credential={credential}
        onEdit={onEdit}
        onDelete={onDelete}
        />
    ))
    )}
</div>
);
};

export default CredentialList;
