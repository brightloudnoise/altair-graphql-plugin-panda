import type { PluginClassInstance, PluginContext, SubscriptionProviderConstructor, SubscriptionProviderExecuteOptions } from 'altair-graphql-plugin';

class FakeSubscriptionProvider {
  execute({ query, variables, operationName }: SubscriptionProviderExecuteOptions) {
    console.log('Executing my sub provider!');
    // should return an Observable
    return '' as any;
  }
  close() {
    // Perform cleanup tasks here.
  }
}

// https://altair.sirmuel.design/docs/plugins/writing-plugin.html
class TemplateClass implements PluginClassInstance {
  initialize(ctx: PluginContext) {

    // Creating a UI panel.
    const div = document.createElement('div');
    div.innerHTML = 'My first plugin!';

    ctx.app.createPanel(div);

    // Adding a custom subscription provider.
    ctx.app.addSubscriptionProvider({
      id: 'my-plugged-provider',
      getProviderClass: async() => FakeSubscriptionProvider as unknown as SubscriptionProviderConstructor,
      copyTag: 'My plugged provider',
    });

    // Creating an action button.
    ctx.app.createAction({
      title: 'Test',
      execute(state) {
        alert('First');
        alert(`Found me!. query: ${state.query}`);
      }
    });

    // Adding a theme.
    ctx.theme.add('new-theme', {
      colors: {
        primary: '#88C0D0',
        secondary: '#8FBCBB',
      },
    });
    ctx.theme.enable('new-theme');
  }

  destroy() {
    throw new Error('Method not implemented.');
  }
}
(window as any)['AltairGraphQL'].plugins.TemplateClass = TemplateClass;
