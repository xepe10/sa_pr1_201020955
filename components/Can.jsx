
import {Can as CanCasl} from '@casl/react'
import { userService } from 'services';
import { AbilityBuilder } from '@casl/ability'
//import {Can} from '@casl/react'
import { Ability } from '@casl/ability';

export { Can };

function Can(props) {
    const ability = AbilityBuilder.define((can) => {
        can('see', ["inicio","roles","empresas","tableros","usuarios","tipopermisos","tablerosroles","empresasusuario","rolesusuario","permisos","permisosroles"])
    });

    return (
        <CanCasl  do={props.do} on={props.on} ability={ability}>
            {props.children}
        </CanCasl>
    );
}
