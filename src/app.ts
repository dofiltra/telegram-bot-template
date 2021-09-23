type TDefSettings = {}

class Def {
  private _settings: TDefSettings

  constructor(s: TDefSettings) {
    this._settings = { ...s }
  }
}

export { Def }
