import {CoreAdminModule} from "./core-admin.module";


describe('CoreModule', () => {
  let coreModule: CoreAdminModule;

  beforeEach(() => {
    coreModule = new CoreAdminModule();
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();
  });
});
