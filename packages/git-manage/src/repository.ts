export type SupportedPlatformName = 'GitHub' | 'GitLab'

export class Repository {
  constructor(
    public remote: string,
    public local: string,
    public platform: SupportedPlatformName,
  ) {}

  push() {}

  commit(message: string) {}

  issue(message: string) {}
}
