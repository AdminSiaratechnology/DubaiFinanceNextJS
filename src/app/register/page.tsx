import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] py-6 sm:py-10">
            <div className="px-6 lg:px-8">
                <RegisterForm />
            </div>
        </div>
    );
}
