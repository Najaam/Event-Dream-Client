import { AppLayout } from '../components/layout/AppLayout';
import { AuthForm } from '../components/auth/AuthForm';

export function AuthPage() {
  return (
    <AppLayout>
      <section className="page-section">
        <AuthForm />
      </section>
    </AppLayout>
  );
}
