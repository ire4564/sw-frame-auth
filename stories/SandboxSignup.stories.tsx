/* eslint-disable no-secrets/no-secrets */
import { SandboxSignup } from '../src/frame-auth/Auth';
import { action } from '@storybook/addon-actions';

import markdown from './SandboxSignup.md';

export default {
    title: 'components',
    component: SandboxSignup,
};

const props = {
    sbResponseHandler: action('clicked'),
    URL: 'https://auth.sandworks.co.kr/',
    clientId: '844467004860-u5kti3btvik07itc8isihu2h9rdei8b5.apps.googleusercontent.com',
};

export const Sandbox_Signup = () => <SandboxSignup {...props} />;

Sandbox_Signup.story = {
    name: 'Sandbox_Signup',
};

Sandbox_Signup.parameters = {
    notes: { markdown },
};
