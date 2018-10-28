import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import StatisticBox, { STATISTIC_ORDER } from 'interface/others/StatisticBox';

function event(name) {
  // TODO: return fluent interface
}

const Events = {
  cast: event('cast'),
  heal: event('heal'),
};

class LightOfDawn extends Analyzer {
  _casts = 0;
  _heals = 0;
  constructor(props) {
    super(props);
    this.addEventListener(Events.cast.by(SELECTED_PLAYER).spell(SPELLS.LIGHT_OF_DAWN_CAST), () => { this._casts += 1; });
    this.addEventListener(Events.heal.by(SELECTED_PLAYER).spell(SPELLS.LIGHT_OF_DAWN_HEAL), () => { this._heals += 1; });
  }

  statistic() {
    return (
      <StatisticBox
        position={STATISTIC_ORDER.CORE(60)}
        icon={<SpellIcon id={SPELLS.LIGHT_OF_DAWN_CAST.id} />}
        value={`${((this._heals.value / this._casts.value) || 0).toFixed(2)} players`}
        label="Average hits per cast"
      />
    );
  }
}

export default LightOfDawn;
