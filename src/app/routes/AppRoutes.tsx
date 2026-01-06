import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@app/features/auth/pages/LoginPage';
import { RegisterPage } from '@app/features/auth/pages/RegisterPage';
import { ProtectedRoute } from '@app/features/auth/components/ProtectedRoute';
import { HomePage } from '@app/features/home/pages/HomePage';
import { ProfilePage } from '@app/features/profile/pages/ProfilePage';
import { SettingsPage } from '@app/features/settings/pages/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
