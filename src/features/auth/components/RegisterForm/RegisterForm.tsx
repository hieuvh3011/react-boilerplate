import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@app/common/Button/Button';
import { Input } from '@app/common/Input/Input';
import { useAuthStore } from '../../store/authStore';

const registerSchema = z
  .object({
    name: z.string().min(1, 'nameRequired'),
    email: z.string().email('emailInvalid').min(1, 'emailRequired'),
    password: z.string().min(6, 'passwordMinLength'),
    confirmPassword: z.string().min(6, 'passwordMinLength'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordsNotMatch',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await registerUser(data.name, data.email, data.password);
      navigate('/');
    } catch (err) {
      setError((err as Error).message || 'Registration failed');
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
          {...register('name')}
          type="text"
          label={t('auth.name')}
          placeholder="John Doe"
          error={errors.name && t(`auth.${errors.name.message}`)}
          required
        />

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

        <Input
          {...register('confirmPassword')}
          type="password"
          label={t('auth.confirmPassword')}
          placeholder="••••••••"
          error={
            errors.confirmPassword &&
            t(`auth.${errors.confirmPassword.message}`)
          }
          required
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-danger rounded-md text-danger text-sm">
          {error}
        </div>
      )}

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? '...' : t('auth.registerButton')}
      </Button>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t('auth.alreadyHaveAccount')}{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          {t('auth.login')}
        </Link>
      </div>
    </form>
  );
};
