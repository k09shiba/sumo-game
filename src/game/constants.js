// ═══════════════════════════════════════════════════
//  DIVISIONS（番付）
//  divIdx: 0=序ノ口 1=序二段 2=三段目 3=幕下 4=十両 5=幕内 6=大関 7=横綱
// ═══════════════════════════════════════════════════
export const DIVISIONS = [
  { id: 'jonokuchi', name: '序ノ口', short: '序口', maxPos: 30,  matches: 7,  salaryBase: 0   },
  { id: 'jonidan',   name: '序二段', short: '序二', maxPos: 120, matches: 7,  salaryBase: 0   },
  { id: 'sandanme',  name: '三段目', short: '三段', maxPos: 100, matches: 7,  salaryBase: 0   },
  { id: 'makushita', name: '幕下',   short: '幕下', maxPos: 60,  matches: 7,  salaryBase: 0   },
  { id: 'juryo',     name: '十両',   short: '十両', maxPos: 28,  matches: 15, salaryBase: 100 },
  { id: 'makunouchi',name: '幕内',   short: '幕内', maxPos: 42,  matches: 15, salaryBase: 200 },
  { id: 'ozeki',     name: '大関',   short: '大関', maxPos: 6,   matches: 15, salaryBase: 300 },
  { id: 'yokozuna',  name: '横綱',   short: '横綱', maxPos: 3,   matches: 15, salaryBase: 500 },
];

export const DIV_JONOKUCHI  = 0;
export const DIV_JONIDAN    = 1;
export const DIV_SANDANME   = 2;
export const DIV_MAKUSHITA  = 3;
export const DIV_JURYO      = 4;
export const DIV_MAKUNOUCHI = 5;
export const DIV_OZEKI      = 6;
export const DIV_YOKOZUNA   = 7;

// ═══════════════════════════════════════════════════
//  三役ポジション上限
// ═══════════════════════════════════════════════════
export const SANYAKU_LIMIT = 12; // 幕内pos≤12 → 三役圏内表示

// ═══════════════════════════════════════════════════
//  場所名
// ═══════════════════════════════════════════════════
export const BASHO_NAMES = [
  { name: '初場所',     place: '東京・両国国技館',          month: 1  },
  { name: '春場所',     place: '大阪・エディオンアリーナ大阪', month: 3  },
  { name: '夏場所',     place: '東京・両国国技館',          month: 5  },
  { name: '名古屋場所', place: '名古屋・IGアリーナ',        month: 7  },
  { name: '秋場所',     place: '東京・両国国技館',          month: 9  },
  { name: '九州場所',   place: '福岡・福岡国際センター',     month: 11 },
];

// ═══════════════════════════════════════════════════
//  得意技（決まり手）
// ═══════════════════════════════════════════════════
export const WAZA = [
  '押し出し','突き出し','寄り切り','上手投げ','下手投げ',
  '引き落とし','はたき込み','掬い投げ','外掛け','内掛け',
  '突き落とし','切り返し','吊り出し','上手出し投げ','肩透かし',
];

// ═══════════════════════════════════════════════════
//  しこ名用テーブル
// ═══════════════════════════════════════════════════
export const NAME_PREFIX = [
  '龍','鳳','鷹','虎','獅','巌','豪','雷','風','雪',
  '剛','猛','輝','海','山','翔','天','錦','照','白',
  '霧','浪','旭','魁','琴','若','栃','千','玉','北',
];
export const NAME_SUFFIX = [
  '海','山','鷹','龍','富士','錦','花','丸','嶋','桜',
  '城','岩','竜','浪','峰','嵐','湖','ノ海','の里','ノ花',
];

// ═══════════════════════════════════════════════════
//  体型タイプ
// ═══════════════════════════════════════════════════
export const BODY_TYPES = [
  { id: 'anko',    name: 'あんこ型', desc: '重量・安定型。体重が乗った相撲。'        },
  { id: 'shohei',  name: '小兵型',   desc: '素早さと技で勝負。機動力が高い。'        },
  { id: 'muscle',  name: '筋肉型',   desc: '筋力で圧倒。スピードと爆発力。'          },
  { id: 'kicchin', name: '細身型',   desc: '技術が伸びやすく動きが速い。体重は軽め。'},
];

// ═══════════════════════════════════════════════════
//  肌色
// ═══════════════════════════════════════════════════
export const SKIN_TONES = [
  { id: 'fair',  name: '白肌',   col: 0xF8D8B0, css: '#F8D8B0' },
  { id: 'wheat', name: '小麦色', col: 0xDDA060, css: '#DDA060' },
  { id: 'brown', name: '褐色',   col: 0xAA6030, css: '#AA6030' },
  { id: 'dark',  name: '黒褐色', col: 0x7A4020, css: '#7A4020' },
];

// ═══════════════════════════════════════════════════
//  顔型
// ═══════════════════════════════════════════════════
export const FACE_TYPES = [
  { id: 'round',  name: '丸顔',   desc: '親しみやすい丸い顔立ち' },
  { id: 'long',   name: '面長',   desc: '精悍で知的な長い顔立ち' },
  { id: 'square', name: '四角顔', desc: '力強く威圧感のある顔立ち' },
  { id: 'baby',   name: '童顔',   desc: '愛嬌があり人気が出やすい' },
];

// ═══════════════════════════════════════════════════
//  相撲スタイル
// ═══════════════════════════════════════════════════
export const SUMO_STYLES = [
  { id: 'oshi',   name: '押し相撲', desc: '押し・突きが得意',     strong: 'light', weak: 'yotsu'  },
  { id: 'yotsu',  name: '四つ相撲', desc: '組んで勝つ相撲',       strong: 'oshi',  weak: 'tech'   },
  { id: 'tech',   name: '技巧派',   desc: '引き・はたきが得意',   strong: 'yotsu', weak: 'oshi'   },
  { id: 'heavy',  name: '重量型',   desc: '体重と圧力で押し込む', strong: 'tech',  weak: null     },
];

// ═══════════════════════════════════════════════════
//  性格特性
// ═══════════════════════════════════════════════════
export const PERSONALITIES = [
  { id: 'earnest',   name: '努力家', icon: '💪',
    desc: '稽古効果が常に+25%。コツコツ積み上げる堅実型。' },
  { id: 'genius',    name: '天才肌', icon: '✨',
    desc: '稽古にムラがあるが大爆発もある。成長が読めない型。' },
  { id: 'spiritual', name: '精神型', icon: '🧘',
    desc: '精神・やる気の伸びが+50%。本番の場所で真価を発揮。' },
  { id: 'technical', name: '技巧派', icon: '🔮',
    desc: '技術系稽古の効果が+50%。細かい技を磨くのが得意。' },
];

// スタイル相性ボーナス
export const STYLE_MATCHUP = {
  oshi:  { oshi: 0, yotsu: -0.06, tech: +0.06, heavy: -0.04 },
  yotsu: { oshi: +0.06, yotsu: 0, tech: -0.06, heavy: -0.03 },
  tech:  { oshi: -0.06, yotsu: +0.06, tech: 0, heavy: +0.05 },
  heavy: { oshi: +0.04, yotsu: +0.03, tech: -0.05, heavy: 0 },
};

// ═══════════════════════════════════════════════════
//  コンディション
// ═══════════════════════════════════════════════════
export const CONDITIONS = [
  { id: 'zeccho',  label: '絶好調', bonus: +0.12, color: '#27ae60' },
  { id: 'kocho',   label: '好調',   bonus: +0.05, color: '#2ecc71' },
  { id: 'futsuu',  label: '普通',   bonus:  0,    color: '#999'    },
  { id: 'fucho',   label: '不調',   bonus: -0.08, color: '#e67e22' },
  { id: 'zefucho', label: '絶不調', bonus: -0.18, color: '#e74c3c' },
];
// conditionIdx: 0=絶好調 ... 4=絶不調（逆順でもOK。下記では 4=絶好調）
// 使いやすくするため 0=絶不調, 4=絶好調 にする
// CONDITIONS[d.conditionIdx] → current condition

// ═══════════════════════════════════════════════════
//  化粧まわしデザイン
// ═══════════════════════════════════════════════════
export const KESHO_MAWASHI = [
  { id: 'akaishi',   name: '赤獅子', col: 0x9B1B30, bdr: 0xD4A800, acc: 0xFFD700, desc: '情熱の赤' },
  { id: 'konpeki',   name: '紺碧',   col: 0x1B3A8A, bdr: 0x8ABAFF, acc: 0xC8E0FF, desc: '冷静な青' },
  { id: 'kogane',    name: '黄金',   col: 0x7A5C00, bdr: 0xFFD700, acc: 0xFFF0A0, desc: '栄光の金' },
  { id: 'murasaki',  name: '紫峰',   col: 0x5A1A8A, bdr: 0xC880FF, acc: 0xE8C8FF, desc: '高貴な紫' },
  { id: 'hagane',    name: '鋼',     col: 0x283848, bdr: 0x90B0C8, acc: 0xC8E0F0, desc: '鉄の意志' },
  { id: 'midori',    name: '翠嵐',   col: 0x1A5A28, bdr: 0x70CC70, acc: 0xB8F0B8, desc: '自然の力' },
];

// ═══════════════════════════════════════════════════
//  施設データ
// ═══════════════════════════════════════════════════
export const FACILITY_DATA = {
  dojo: {
    name: '稽古場', icon: '🏋',
    levels: [
      { label: '土間稽古場',  cost: 0,   effect: '基本稽古が使用可' },
      { label: '本格土俵',    cost: 200, effect: '稽古効果+10%' },
      { label: '複数土俵',    cost: 500, effect: '稽古効果+25%' },
    ],
  },
  kitchen: {
    name: '厨房', icon: '🍲',
    levels: [
      { label: '家庭用竈',    cost: 0,   effect: '基本ちゃんこ' },
      { label: '業務用設備',  cost: 150, effect: 'ちゃんこ効果+20%' },
      { label: '専属料理人',  cost: 400, effect: 'ちゃんこ効果+50%、毎場所体力+5' },
    ],
  },
  medical: {
    name: '医務室', icon: '🏥',
    levels: [
      { label: '救急箱のみ',  cost: 0,   effect: '怪我回復：遅い' },
      { label: '医務室完備',  cost: 200, effect: '怪我回復速度+50%' },
      { label: 'トレーナー常駐', cost: 450, effect: '怪我ゼロ時に毎場所体力+3' },
    ],
  },
  scout: {
    name: 'スカウト網', icon: '🔍',
    levels: [
      { label: '口コミのみ',  cost: 0,   effect: '弟子上限3人' },
      { label: '地域スカウト', cost: 250, effect: '弟子上限5人、素質UP' },
      { label: '全国スカウト', cost: 600, effect: '弟子上限6人、素質大UP' },
    ],
  },
};

// 施設レベルによる弟子上限
export const MAX_DISCIPLES_BY_SCOUT = [3, 5, 6];

// ═══════════════════════════════════════════════════
//  特別稽古（投資メニュー）
// ═══════════════════════════════════════════════════
export const SPECIAL_TRAINING = [
  {
    id: 'degeiko',     name: '出稽古（他部屋）', cost: 30, icon: '🤝',
    desc: '技術+10〜20、精神+5〜10',
    req: null,
    apply: (d) => ({ tech: rRange(10,20), spirit: rRange(5,10) }),
  },
  {
    id: 'yamagomori',  name: '山籠もり合宿',    cost: 50, icon: '⛰',
    desc: '全ステ+8〜15、スタミナ全回復',
    req: null,
    apply: (d) => ({ power: rRange(8,15), tech: rRange(8,15), spirit: rRange(8,15), stamRestore: true }),
  },
  {
    id: 'yokodojo',    name: '横綱道場特訓',    cost: 100, icon: '🏆',
    desc: '全ステ+15〜25（幕内以上のみ）',
    req: { minDiv: DIV_MAKUNOUCHI },
    apply: (d) => ({ power: rRange(15,25), tech: rRange(15,25), spirit: rRange(15,25) }),
  },
  {
    id: 'kaigai',      name: '海外巡業',        cost: 80, icon: '✈',
    desc: '精神+20、やる気+30',
    req: null,
    apply: (d) => ({ spirit: 20, motivation: 30 }),
  },
];

// ═══════════════════════════════════════════════════
//  アイテム
// ═══════════════════════════════════════════════════
export const ITEMS = [
  { id: 'chanko_plus', name: '高級ちゃんこ食材', cost: 20, icon: '🥘', desc: '食べるコマンド効果+50%', duration: 1 },
  { id: 'mawashi_sp',  name: '特製まわし',       cost: 40, icon: '🎽', desc: '場所中の勝率+3%',       duration: 1 },
  { id: 'kampo',       name: '漢方薬',           cost: 35, icon: '🌿', desc: '怪我の回復を1段階早める', duration: 1 },
  { id: 'goma',        name: '護摩行体験',       cost: 45, icon: '🔥', desc: '精神+20、粘りUP',        duration: 1 },
];

// ═══════════════════════════════════════════════════
//  部屋の名声施策
// ═══════════════════════════════════════════════════
export const PRESTIGE_ACTIONS = [
  { id: 'enkai',    name: '後援会パーティー',  cost: 60,  icon: '🥂', desc: '毎場所収入+10両（永続）', incomeBonus: 10 },
  { id: 'kyoshitsu',name: '相撲教室開催',      cost: 40,  icon: '📚', desc: '次スカウトで素質高い候補',  scoutBonus: 1   },
  { id: 'kogokai',  name: '地域後援会設立',    cost: 100, icon: '🏙', desc: 'スポンサーから毎場所+20両', incomeBonus: 20 },
];

export const SCOUT_ACTIONS = [
  { id: 'haken',    name: 'スカウト派遣',     cost: 30, icon: '🔎', desc: '次場所後に良い素質の候補が来やすい' },
  { id: 'sainou',   name: '才能発掘調査',     cost: 50, icon: '💡', desc: '弟子の隠れ才能上限を少し引き上げ'  },
];

// ═══════════════════════════════════════════════════
//  スポンサー
// ═══════════════════════════════════════════════════
export const SPONSORS = [
  { id: 'yamada',    name: '山田商会',   income: 40,  icon: '🏪',
    desc: '地元商店街の熱烈な後援', minDiv: 0 },
  { id: 'toyo',      name: '東洋建設',   income: 70,  icon: '🏗',
    desc: '大手建設会社の本格スポンサー', minDiv: 3 },
  { id: 'daikokuya', name: '大黒屋',     income: 55,  icon: '🎪',
    desc: '老舗デパートの冠スポンサー', minDiv: 2 },
  { id: 'kokusen',   name: '国千食品',   income: 90,  icon: '🍜',
    desc: '食品メーカーの大口支援', minDiv: 4 },
  { id: 'fujitv',    name: '富士テレビ', income: 120, icon: '📺',
    desc: 'テレビ局の番組スポンサー', minDiv: 5 },
];

// ═══════════════════════════════════════════════════
//  稽古コマンド
// ═══════════════════════════════════════════════════
export const TRAINING_CMDS = [
  { id: 'oshi',    label: '押し稽古',    icon: '💪', stamCost: 25, mainStat: 'power',  styleBoost: 'oshi',  desc: '筋力+大、押し相撲を強化' },
  { id: 'yotsu',   label: '四つ稽古',   icon: '🤼', stamCost: 20, mainStat: 'tech',   styleBoost: 'yotsu', desc: '技術+大、組み手を強化'   },
  { id: 'nage',    label: '投げ稽古',   icon: '🌀', stamCost: 20, mainStat: 'tech',   styleBoost: null,    desc: '技術+中、体重-少'        },
  { id: 'run',     label: '走り込み',   icon: '🏃', stamCost: 15, mainStat: 'stamMax',styleBoost: null,    desc: '体力上限+大、体重-少'    },
  { id: 'mental',  label: '精神修行',   icon: '🧘', stamCost: 10, mainStat: 'spirit', styleBoost: null,    desc: '精神+大、やる気+中'      },
  { id: 'diet',    label: '体重管理',   icon: '⚖', stamCost: 15, mainStat: 'weight', styleBoost: null,    desc: '適正体重に近づける'      },
  { id: 'group',   label: '合同稽古',   icon: '👥', stamCost: 20, mainStat: 'all',    styleBoost: null,    desc: '全ステ+小（施設Lv依存）' },
  { id: 'cond',    label: '調子を整える',icon: '✨', stamCost: 5,  mainStat: 'cond',   styleBoost: null,    desc: 'コンディション1段UP'     },
  { id: 'sleep',   label: '休養',       icon: '😴', stamCost: 0,  mainStat: 'stam',   styleBoost: null,    desc: 'スタミナ全回復、やる気+' },
  { id: 'eat',     label: '食べる',     icon: '🍲', stamCost: 0,  mainStat: 'eat',    styleBoost: null,    desc: '体重+、体力+（適正体重まで効果大）' },
];

// ═══════════════════════════════════════════════════
//  ランダムイベント
// ═══════════════════════════════════════════════════
export const RANDOM_EVENTS = [
  {
    id: 'slump',     prob: 0.08, icon: '😓',
    title: 'スランプ',
    text: (d) => `${d.name}がスランプに陥った！`,
    apply: (d) => { d.conditionIdx = Math.max(0, d.conditionIdx - 2); d.motivation = Math.max(10, d.motivation - 20); },
  },
  {
    id: 'inspiration', prob: 0.06, icon: '💡',
    title: '閃き',
    text: (d) => `${d.name}が稽古中に閃いた！技術が伸びる！`,
    apply: (d) => { d.tech += rRange(15, 25); },
  },
  {
    id: 'injury_light', prob: 0.07, icon: '🤕',
    title: '軽傷',
    text: (d) => `${d.name}が稽古中に軽い怪我をした。`,
    apply: (d) => { if (d.injuryLevel === 0) d.injuryLevel = 1; },
  },
  {
    id: 'fan',         prob: 0.05, icon: '📮',
    title: 'ファンレター',
    text: (d) => `${d.name}にファンレターが届いた！やる気が上がった！`,
    apply: (d) => { d.motivation = Math.min(100, d.motivation + 25); },
  },
  {
    id: 'power_up',    prob: 0.05, icon: '🔥',
    title: '覚醒',
    text: (d) => `${d.name}が覚醒した！筋力が大幅に伸びた！`,
    apply: (d) => { d.power += rRange(20, 35); },
  },
  {
    id: 'senior_advice', prob: 0.06, icon: '🧓',
    title: '長老の教え',
    text: (d) => `部屋の先輩から秘伝の技を伝授された！`,
    apply: (d) => { d.tech += rRange(10, 18); d.spirit += rRange(5, 10); },
  },
  {
    id: 'good_sleep',  prob: 0.04, icon: '😪',
    title: '熟睡',
    text: (d) => `${d.name}がぐっすり眠れた。体の回復が早い！`,
    apply: (d) => { d.stamina = Math.min(d.maxStamina, d.stamina + 30); d.conditionIdx = Math.min(4, d.conditionIdx + 1); },
  },
  {
    id: 'sensei_guidance', prob: 0.05, icon: '🧑‍🏫',
    title: '師匠の特訓',
    text: (d) => `師匠が${d.name}に特別稽古をつけてくれた！全能力が大幅に伸びた！`,
    apply: (d) => { d.power += rRange(5,12); d.tech += rRange(5,12); d.spirit += rRange(3,8); },
  },
  {
    id: 'muscle_growth', prob: 0.05, icon: '💪',
    title: '肉体強化',
    text: (d) => `${d.name}の体が一回り大きくなった！筋力がぐんと伸びた！`,
    apply: (d) => { d.power += rRange(8,15); d.weight = Math.min(250, d.weight + rRange(2,5)); },
  },
  {
    id: 'magazine_feature', prob: 0.04, icon: '📰',
    title: '雑誌取材',
    text: (d) => `相撲雑誌の取材を受けた！${d.name}のやる気が大きく上がった！`,
    apply: (d) => { d.motivation = Math.min(100, d.motivation + 20); d.spirit += rRange(3,8); },
  },
  {
    id: 'morning_training', prob: 0.05, icon: '🌅',
    title: '早朝特訓の気づき',
    text: (d) => `${d.name}が夜明けの稽古で重要な気づきを得た！技術と精神が伸びた！`,
    apply: (d) => { d.tech += rRange(8,15); d.spirit += rRange(5,10); },
  },
  {
    id: 'rival_spurred', prob: 0.05, icon: '⚔',
    title: 'ライバルに刺激される',
    text: (d) => `ライバルの活躍を聞いて${d.name}が奮起した！やる気が急上昇！`,
    apply: (d) => { d.motivation = Math.min(100, d.motivation + 25); d.spirit += rRange(5,10); },
  },
  {
    id: 'injury_heavy', prob: 0.03, icon: '🤕',
    title: '重傷',
    text: (d) => `${d.name}が稽古中に重い怪我をした。無理は禁物！`,
    apply: (d) => { d.injuryLevel = 2; },
  },
  {
    id: 'camp_training', prob: 0.04, icon: '⛺',
    title: '合宿稽古',
    text: (d) => `${d.name}が他部屋との合宿稽古に参加！全能力と気力が上がった！`,
    apply: (d) => { d.power += rRange(3,8); d.tech += rRange(3,8); d.spirit += rRange(3,8); d.motivation = Math.min(100, d.motivation+10); },
  },
  {
    id: 'weight_management', prob: 0.04, icon: '⚖',
    title: '体重最適化',
    text: (d) => `${d.name}が適正体重を意識した食事管理を始めた！`,
    apply: (d) => { const opt = d.optimalWeight; const diff = d.weight - opt; if(Math.abs(diff)>5) { d.weight += diff>0 ? -rRange(2,5) : rRange(2,4); } },
  },
];

// ═══════════════════════════════════════════════════
//  場所中ドラマイベント
// ═══════════════════════════════════════════════════
export const DRAMA_EVENTS = {
  KINBOSHI: 'kinboshi',       // 金星
  SANSHO:   'sansho',         // 三賞候補
  INTERVIEW: 'interview',     // 記者インタビュー
  INJURY:   'injury',         // 場中怪我
  RIVAL:    'rival',          // ライバル直接対決
  YUSHO:    'yusho',          // 優勝決定戦
  DECISIVE: 'decisive',       // 千秋楽大一番
};

// ═══════════════════════════════════════════════════
//  三賞
// ═══════════════════════════════════════════════════
export const SANSHO = [
  { id: 'shukun',  name: '殊勲賞', cond: (wins, pos) => wins >= 10 && pos <= 20 },
  { id: 'kanto',   name: '敢闘賞', cond: (wins, pos) => wins >= 11 },
  { id: 'gino',    name: '技能賞', cond: (wins, pos) => wins >= 10 && wins <= 12 },
];

export const TRAINING_TURNS_PER_BASHO = 10;

// ═══════════════════════════════════════════════════
//  ユーティリティ
// ═══════════════════════════════════════════════════
export function rRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
