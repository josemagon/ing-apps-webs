import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { JWTAuthenticationStrategy, JWTServiceProvider, KEY } from './authentication-strategies';
import { CronComponent } from '@loopback/cron';
import { PaginasCronJob } from './utils/PaginasCronJob';

export {ApplicationConfig};

export class Tarea2Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.component(AuthenticationComponent);
    this.service(JWTServiceProvider);

    this.component(CronComponent)
    this.add(createBindingFromClass(PaginasCronJob))

    registerAuthenticationStrategy(this as any, JWTAuthenticationStrategy)

    this.configure(KEY).to({
      jwksUri : 'https://dev-qs86j48a.us.auth0.com/.well-known/jwks.json',
      issuer : 'https://dev-qs86j48a.us.auth0.com/',
      audience: 'https://dev-qs86j48a.us.auth0.com/api/v2/',
      algorithms : ['RS256']
    })

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
