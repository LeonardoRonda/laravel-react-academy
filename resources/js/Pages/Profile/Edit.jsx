import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Editar perfil</h2>}
        >
            <Head title="Editar perfil" />

            <div className="mx-auto max-w-3xl space-y-6">
                <div className="panel">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="panel">
                    <UpdatePasswordForm />
                </div>

                <div className="panel">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
