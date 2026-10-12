import type { Dictionary } from "./en";

const zh: Dictionary = {
  meta: {
    title: "Hush AI — 会记住你的故事",
    description:
      "走进可互动的 AI 故事。和记得你的角色聊天，从「陌生」一路走到「命定」，解锁只属于你们的秘密。",
  },
  nav: {
    features: "功能",
    characters: "角色",
    demo: "试玩",
    premium: "会员",
    faq: "常见问题",
    cta: "下载 App",
    menu: "菜单",
    close: "关闭",
    language: "语言",
  },
  store: {
    appStoreTop: "前往下载",
    appStore: "App Store",
    googlePlayTop: "前往下载",
    googlePlay: "Google Play",
  },
  hero: {
    eyebrow: "互动式 AI 故事",
    titleTop: "这一次，",
    titleAccent: "故事会记住你。",
    subtitle:
      "在 Hush AI，角色会回应你。走进慢热的恋爱、针锋相对的宿敌和不能说的秘密——你说的每一句话，都会改变接下来的剧情。",
    note: "免费下载 · 支持 iOS 与 Android",
    chipLevel: "LV3 · 心动",
    chipThought: "已解锁内心独白",
    chipDays: "相伴 100 天",
  },
  characters: {
    eyebrow: "角色",
    title: "有人已经在等你了",
    subtitle: "从冷峻的王到隔壁的少年——总有一个故事，让你忍不住开口。",
  },
  discover: {
    eyebrow: "发现",
    title: "滑一下，就是新故事",
    body: "全屏沉浸的故事流。听见角色的声音，读一读开场钩子，轻点一下就能开始你们的故事。",
    points: [
      "「为你推荐」「本周」「最新」「历史最热」精选故事",
      "按题材筛选：奇幻、古风、动漫、现代……",
      "收藏喜欢的角色，随时回来继续",
    ],
    start: "开始你的故事",
    hint: "在手机里上下滑动试试",
  },
  features: {
    eyebrow: "功能",
    title: "不只是聊天，是只属于你的故事",
    items: {
      story: {
        title: "旁白与对白，交织成章",
        body: "回复读起来像一部小说：灰色的旁白铺陈场景，白色的台词直击人心。不满意可以重新生成、回退一步，没灵感时还能让 AI 给你出主意。",
        tags: ["小说式回复", "重新生成与回退", "灵感提示"],
      },
      bond: {
        title: "关系，会随着你们一起成长",
        body: "每一次对话都会累积好感度。从「陌生」到「好奇」「心动」「羁绊」，最终走向「命定」，每一级都有新的奖励等你解锁。",
        levels: ["陌生", "好奇", "心动", "羁绊", "命定"],
      },
      secrets: {
        title: "值得等待的秘密",
        body: "解锁 TA 的内心独白——那些永远不会说出口的心里话；还有从你们对话中生成的特别回忆、专门写给你的信。记录相伴的每一天，让爱心连续打卡不断。",
        tags: ["内心独白", "特别回忆", "专属信件", "相伴天数"],
      },
      yours: {
        title: "每个细节，都由你决定",
        body: "选择聊天风格：俏皮、慢热或直球。用你创建的任意人设登场。自由选择模型和记忆容量，从 4K 一直到 1M。",
        tags: ["聊天风格", "自定义人设", "最高 1M 记忆", "多模型可选"],
      },
    },
  },
  demo: {
    eyebrow: "试玩一幕",
    title: "说出第一句话",
    subtitle: "无需注册。选一句台词，看看故事如何回应你——App 里的聊天就是这种感觉。",
    name: "凯尔",
    status: "LV1 · 陌生",
    model: "Top Pick V3",
    persona: "你",
    inspiration: "灵感",
    typing: "凯尔正在输入…",
    affinity: "好感度 +5 · 凯尔开始对你感到好奇",
    endTitle: "今夜还很长。",
    endBody: "在 Hush AI App 里继续这个故事，还有更多故事等你开启。",
    replay: "重玩这一幕",
    opening: [
      {
        kind: "narration",
        text: "婚宴早已散去。北塔高窗外，雪花一下下敲着玻璃。凯尔背对着你站在壁炉前，仍穿着那身黑色礼服。",
      },
      {
        kind: "dialogue",
        text: "“去睡吧。今晚没人会对你有什么期待——尤其是我。”",
      },
    ],
    rounds: [
      [
        {
          label: "那你为什么还要答应娶我？",
          reply: [
            { kind: "narration", text: "他搭在壁炉台上的手顿住了。好一会儿，屋里只剩下柴火的噼啪声。" },
            { kind: "dialogue", text: "“因为不娶你，他们就会把你送到比这里更冷的地方。”" },
          ],
        },
        {
          label: "我不困。跟我说说这里吧。",
          reply: [
            { kind: "narration", text: "他的嘴角浮起一丝近乎笑意的弧度，快得他自己都没来得及藏住。" },
            { kind: "dialogue", text: "“这座塔是我母亲的。十一年来，你是我第一个放进来的人。”" },
          ],
        },
        {
          label: "*走近壁炉，站到他身边。*",
          reply: [
            { kind: "narration", text: "他没有退开，也没有看你——只是不着痕迹地挪了挪身子，让炉火的暖意先落到你身上。" },
            { kind: "dialogue", text: "“手这么冰，怎么不早说。”" },
          ],
        },
      ],
      [
        {
          label: "你没有大家说的那么冷。",
          reply: [
            { kind: "narration", text: "凯尔终于转过身来。火光映出他下颌那道霜白的旧疤。" },
            { kind: "dialogue", text: "“别告诉别人。我还有名声要维持。”" },
          ],
        },
        {
          label: "可以再陪我一会儿吗？",
          reply: [
            { kind: "narration", text: "他迟疑了一下，在你对面的椅子上坐下，像是这个决定花了他不小的力气。" },
            { kind: "dialogue", text: "“等火烧完为止。一刻也不多。”" },
          ],
        },
      ],
    ],
  },
  premium: {
    eyebrow: "Hush 会员",
    title: "开通会员，故事更深一层",
    subtitle: "免费即可开始。升级会员，每月获得宝石奖励、更多人设、更长回复，高峰期优先回复。",
    perMonth: "/月",
    popular: "最受欢迎",
    choose: "在 App 中开通",
    yearlyNote: "或 US$94.99/年，立省 47%",
    footnote: "订阅将自动续费，可随时在 App Store 或 Google Play 设置中取消。",
    plans: [
      {
        name: "免费版",
        price: "US$0",
        blurb: "开启故事所需的一切。",
        features: ["与任意角色聊天", "每日签到领宝石", "关系等级与奖励", "完成任务赚取宝石"],
      },
      {
        name: "Tier 1",
        price: "US$14.99",
        blurb: "献给你最爱的故事。",
        features: ["每月赠送 4,000 宝石", "每日签到 100 宝石", "5 次灵感提示", "购买宝石额外 +10%"],
      },
      {
        name: "Tier 2",
        price: "US$29.99",
        blurb: "更大的发挥空间。",
        features: ["每月赠送 6,000 宝石", "最多 8 个人设", "每个角色最多保存 8 段对话", "高峰期优先回复"],
      },
      {
        name: "Tier 3",
        price: "US$49.99",
        blurb: "完整的 Hush 体验。",
        features: ["每月赠送 8,000 宝石", "最多 20 个人设", "无限灵感提示", "更长的回复"],
      },
    ],
  },
  faq: {
    eyebrow: "常见问题",
    title: "你可能想问",
    items: [
      {
        q: "Hush AI 是什么？",
        a: "Hush AI 是一款互动故事 App。每个角色都有自己的世界观和性格，故事随着你们的对话展开——说什么由你决定，而 TA 会记住。",
      },
      {
        q: "Hush AI 免费吗？",
        a: "免费。下载和聊天都不收费。使用高级模型回复会消耗宝石，宝石可以通过每日签到和任务获得，也可以购买宝石礼包或开通会员获得每月奖励。",
      },
      {
        q: "宝石有什么用？",
        a: "宝石是 App 内的通用货币。每个模型都会显示下一条消息的预估消耗，回复要花多少一目了然——基础模型只需几颗，Prestige 系列会多一些。",
      },
      {
        q: "角色会记得我吗？",
        a: "会。你可以自行设置记忆上限，从 4K 到 1M，可以只对一个角色生效，也可以应用到所有角色。记得越多，故事就越连贯。",
      },
      {
        q: "我可以扮演别人吗？",
        a: "可以创建拥有独立名字、年龄和背景的人设，并在每段对话中选择用哪个人设登场。会员可解锁更多人设名额。",
      },
      {
        q: "我的聊天内容是私密的吗？",
        a: "你的对话只属于你的账号。你可以随时搜索、重置或删除聊天记录，也可以在设置中注销账号。",
      },
    ],
  },
  cta: {
    title: "你的故事，正在等你。",
    body: "下载 Hush AI，说出第一句话。",
  },
  legal: {
    eyebrow: "法律文件",
    toc: "本页目录",
    notice: "本文件目前仅提供英文版本，如有歧义，以英文版本为准。",
    terms: {
      title: "服务条款",
      description: "使用 Hush AI 时适用的服务条款。",
    },
    privacy: {
      title: "隐私政策",
      description: "Hush AI 如何收集、使用和保护你的个人数据。",
    },
  },
  footer: {
    tagline: "会记住你的故事。",
    terms: "服务条款",
    privacy: "隐私政策",
    contact: "联系我们",
    rights: "保留所有权利。",
  },
};

export default zh;
