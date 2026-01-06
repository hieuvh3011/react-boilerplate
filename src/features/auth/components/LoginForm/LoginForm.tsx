import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@app/common/Button/Button';
import { Input } from '@app/common/Input/Input';
import { useAuthStore } from '../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('emailInvalid').min(1, 'emailRequired'),
  password: z.string().min(6, 'passwordMinLength'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await login(data.email, data.password);
      navigate('/');
    } catch {
      setError(t('auth.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Input
          {...register('email')}
          type="email"
          label={t('auth.email')}
          placeholder="user@example.com"
          error={errors.email && t(`auth.${errors.email.message}`)}
          required
        />

        <Input
          {...register('password')}
          type="password"
          label={t('auth.password')}
          placeholder="••••••••"
          error={errors.password && t(`auth.${errors.password.message}`)}
          required
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-danger rounded-md text-danger text-sm">
          {error}
        </div>
      )}

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? '...' : t('auth.loginButton')}
      </Button>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t('auth.dontHaveAccount')}{' '}
        <Link
          to="/register"
          className="text-primary font-medium hover:underline"
        >
          {t('auth.register')}
        </Link>
      </div>
    </form>
  );
};
