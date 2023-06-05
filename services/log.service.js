import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/logs`;
const actionViewPage = 'ver_pagina';

export const logService = {
    pageview
};

function pageview(path, userid) {
    return fetchWrapper.post(`${baseUrl}`, { action: actionViewPage, url: path, userid })
        .then(log => {
            return log;
        });
}