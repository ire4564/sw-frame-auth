/* eslint-disable no-secrets/no-secrets */
import { SandboxLogin } from '../src/frame-auth/Auth';
import { action } from '@storybook/addon-actions';

import markdown from './SandboxLogin.md';

export default {
    title: 'components',
    component: SandboxLogin,
};

const props = {
    sbResponseHandler: action('clicked'),
    URL: 'https://auth.sandworks.co.kr/',
    clientId: '844467004860-u5kti3btvik07itc8isihu2h9rdei8b5.apps.googleusercontent.com',
};

export const Sandbox_login = () => <SandboxLogin {...props} />;

Sandbox_login.story = {
    name: 'Sandbox_login',
};

Sandbox_login.parameters = {
    notes: { markdown },
};
