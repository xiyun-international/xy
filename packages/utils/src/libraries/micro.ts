let instance = null;

export async function bootstrap() {}
export async function mount(instan) {
  instance = instan;
  return instance;
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}
