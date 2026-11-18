import { useEffect, useMemo, useState } from 'react';

const navItems = [
  { path: '/', cn: '首页', en: 'HOME' },
  { path: '/courses', cn: '课程', en: 'COURSES' },
  { path: '/faculty', cn: '师资', en: 'FACULTY' },
  { path: '/works', cn: '作品', en: 'WORKS' },
  { path: '/booking', cn: '预约', en: 'BOOKING' },
];

const courses = [
  { key: 'ballet', title: '芭蕾基础', en: 'BALLET FOUNDATION', age: '6–9岁', copy: '优雅体态 · 科学训练 · 建立扎实基本功', image: '/assets/hero-dance.png' },
  { key: 'chinese', title: '中国舞韵', en: 'CHINESE DANCE', age: '7–12岁', copy: '身韵气质 · 文化浸润 · 传承东方美学', image: '/assets/course-chinese.png' },
  { key: 'creative', title: '创意舞动', en: 'CREATIVE MOVEMENT', age: '6–9岁', copy: '想象力 · 肢体表达 · 激发创造潜能', image: '/assets/course-creative.png' },
  { key: 'stage', title: '舞台表达', en: 'STAGE EXPRESSION', age: '9–12岁', copy: '自信表现 · 舞台实践 · 绽放独特光芒', image: '/assets/stage-work.png' },
];

const faculty = [
  { name: '林澜', role: '芭蕾课程主理人', focus: '古典芭蕾 · 少儿体态', note: '以清晰、温和的方式建立孩子的身体意识与审美表达。' },
  { name: '顾序', role: '中国舞课程主理人', focus: '中国古典舞 · 身韵', note: '让传统文化进入日常训练，帮助孩子舞出气韵与自信。' },
  { name: '沈悦', role: '创意舞动导师', focus: '即兴创作 · 舞台表达', note: '鼓励每个孩子保留想象力，并找到属于自己的动作语言。' },
];

function useRoute() {
  const readHash = () => window.location.hash.replace(/^#/, '') || '/';
  const [path, setPath] = useState(readHash);
  useEffect(() => {
    const onHash = () => setPath(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const go = (next) => {
    if (next === path) return;
    window.location.hash = next;
    setPath(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return [path, go];
}

function LinkButton({ to, go, className = '', children }) {
  return <a href={`#${to}`} className={className} onClick={(event) => { event.preventDefault(); go(to); }}>{children}</a>;
}

function Header({ path, go }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <LinkButton to="/" go={go} className="brand" aria-label="澜序舞蹈美育首页">
        <span className="brand-mark">L</span>
        <span className="brand-copy"><strong>澜序舞蹈美育</strong><small>LANSÉE DANCE</small></span>
      </LinkButton>
      <button className="menu-button" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>菜单</button>
      <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="主导航">
        {navItems.map((item) => (
          <LinkButton key={item.path} to={item.path} go={(next) => { go(next); setOpen(false); }} className={path === item.path ? 'nav-link is-active' : 'nav-link'}>
            <span>{item.cn}</span><small>{item.en}</small>
          </LinkButton>
        ))}
      </nav>
      <LinkButton to="/booking" go={go} className="header-cta">预约试听</LinkButton>
    </header>
  );
}

function Hero({ go }) {
  return (
    <section className="hero page-section">
      <div className="hero-copy">
        <p className="eyebrow">BOUTIQUE DANCE EDUCATION · 6–12岁</p>
        <h1>在光影里，<br />让每个孩子<br /><em>成为更好的自己</em></h1>
        <p className="hero-note">澜序舞蹈美育 LANSÉE DANCE</p>
        <p className="hero-detail">精品小班舞蹈教育<br />芭蕾 × 中国舞 × 创意 × 舞台表达</p>
        <div className="button-row">
          <LinkButton to="/booking" go={go} className="button button-primary">预约试听 <span>→</span></LinkButton>
          <LinkButton to="/courses" go={go} className="button button-ghost">查看课程 <span>→</span></LinkButton>
        </div>
      </div>
      <div className="hero-visual" data-parallax><img src="/assets/hero-dance.png" alt="老师带领孩子在明亮舞蹈教室练习" /></div>
      <div className="hero-word" aria-hidden="true">LANSÉE</div>
      <span className="scroll-cue">SCROLL</span>
    </section>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return <div className="section-heading" data-reveal><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function CoursePath({ go }) {
  return (
    <section className="course-section page-section">
      <SectionHeading eyebrow="课程体系 · CURRICULUM" title="从基础到表达，系统成长路径" body="不是把动作做整齐，而是让身体、审美与表达一起生长。" />
      <div className="course-grid">
        {courses.map((course, index) => (
          <article className="course-card" key={course.key} data-reveal>
            <div className="course-image"><img src={course.image} alt={`${course.title}课程示意`} /></div>
            <div className="course-index">0{index + 1}</div>
            <p>{course.en}</p><h3>{course.title}</h3><span>{course.age}</span><small>{course.copy}</small>
          </article>
        ))}
      </div>
      <div className="center-action"><LinkButton to="/courses" go={go} className="text-link">完整了解课程体系 →</LinkButton></div>
    </section>
  );
}

function WorksPreview({ go }) {
  return (
    <section className="works-preview page-section">
      <SectionHeading eyebrow="学员作品 · STUDENT WORKS" title="每一次练习，都是成长的作品" body="记录课堂中的专注、创作中的勇气，以及走上舞台时的从容。" />
      <div className="editorial-collage" data-reveal>
        <figure className="collage-large"><img src="/assets/course-chinese.png" alt="中国舞课程作品" /><figcaption>身韵习作《听风》</figcaption></figure>
        <figure><img src="/assets/course-creative.png" alt="创意舞动课堂作品" /><figcaption>创意课堂《流动的颜色》</figcaption></figure>
        <figure><img src="/assets/stage-work.png" alt="学员舞台演出作品" /><figcaption>舞台作品《微光》</figcaption></figure>
      </div>
      <div className="center-action"><LinkButton to="/works" go={go} className="button button-ghost">查看作品集 <span>→</span></LinkButton></div>
    </section>
  );
}

function HomePage({ go }) { return <><Hero go={go} /><CoursePath go={go} /><WorksPreview go={go} /><StudioTeaser go={go} /></>; }

function PageIntro({ eyebrow, title, lead, image, imageAlt }) {
  return <section className="inner-hero page-section"><div className="inner-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lead}</p></div><div className="inner-image"><img src={image} alt={imageAlt} /></div></section>;
}

function CoursesPage({ go }) {
  const [age, setAge] = useState('all');
  const filtered = useMemo(() => age === 'all' ? courses : courses.filter((item) => item.age.includes(age)), [age]);
  return <>
    <PageIntro eyebrow="COURSES · 课程体系" title="一条看得见的成长路径" lead="从身体启蒙、动作基础，到创意表达与舞台实践。每个阶段都有适合孩子年龄与能力的训练重点。" image="/assets/course-creative.png" imageAlt="孩子们进行创意舞动课程" />
    <section className="page-section course-catalog">
      <div className="filter-row" role="group" aria-label="按年龄筛选课程">{[['all','全部课程'],['6–9','6–9岁'],['9–12','9–12岁']].map(([value, label]) => <button key={value} className={age === value ? 'filter is-active' : 'filter'} onClick={() => setAge(value)}>{label}</button>)}</div>
      <div className="catalog-list">{filtered.map((course, index) => <article className="catalog-card" key={course.key} data-reveal><img src={course.image} alt={`${course.title}课程`} /><div><span>0{index + 1} / {course.age}</span><h2>{course.title}</h2><p>{course.copy}</p><ul><li>每班 6–8 人</li><li>每周 1–2 次课程</li><li>阶段性课堂记录与反馈</li></ul><LinkButton to="/booking" go={go} className="text-link">预约该课程试听 →</LinkButton></div></article>)}</div>
    </section><Callout go={go} />
  </>;
}

function FacultyPage({ go }) {
  return <>
    <PageIntro eyebrow="FACULTY · 师资团队" title="专业之外，更懂孩子" lead="我们重视技术，也重视每一次沟通。老师会观察孩子的身体条件、学习节奏与情绪状态，给出具体而温和的引导。" image="/assets/faculty.png" imageAlt="澜序舞蹈美育教师团队" />
    <section className="page-section faculty-list">{faculty.map((teacher, index) => <article className="faculty-card" key={teacher.name} data-reveal><span>0{index + 1}</span><h2>{teacher.name}</h2><p className="role">{teacher.role}</p><p>{teacher.note}</p><small>{teacher.focus}</small></article>)}</section>
    <section className="teaching-belief page-section" data-reveal><p className="eyebrow">TEACHING BELIEF · 教学理念</p><blockquote>“看见每个孩子的节奏，<br />比追赶统一的速度更重要。”</blockquote><p>清晰目标 · 正向反馈 · 审美浸润 · 长期陪伴</p></section><Callout go={go} />
  </>;
}

function WorksPage({ go }) {
  const [lightbox, setLightbox] = useState(null);
  const works = [
    { image: '/assets/stage-work.png', title: '舞台作品《微光》', tag: '舞台表达' },
    { image: '/assets/course-chinese.png', title: '身韵习作《听风》', tag: '中国舞韵' },
    { image: '/assets/course-creative.png', title: '课堂创作《流动的颜色》', tag: '创意舞动' },
    { image: '/assets/hero-dance.png', title: '基础课堂《第一束光》', tag: '芭蕾基础' },
  ];
  return <>
    <PageIntro eyebrow="WORKS · 学员作品" title="成长，值得被认真记录" lead="以下为品牌概念案例中的示范内容，用来展示课堂记录、阶段习作与舞台作品如何被呈现。" image="/assets/stage-work.png" imageAlt="孩子们在舞台上完成舞蹈作品" />
    <section className="page-section gallery-grid">{works.map((work, index) => <button className={`gallery-item item-${index + 1}`} key={work.title} onClick={() => setLightbox(work)} data-reveal><img src={work.image} alt={work.title} /><span><small>{work.tag}</small>{work.title}</span></button>)}</section>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title} onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)}>关闭</button><img src={lightbox.image} alt={lightbox.title} /><p>{lightbox.title}</p></div>}<Callout go={go} />
  </>;
}

function StudioTeaser({ go }) {
  return <section className="studio-teaser page-section" data-reveal><img src="/assets/studio.png" alt="澜序舞蹈美育示范校区环境" /><div><p className="eyebrow">THE STUDIO · 教学环境</p><h2>让孩子愿意靠近、<br />也能安心专注的空间</h2><p>专业地胶、通透采光、独立更衣与家长等候区。此处为品牌概念案例中的虚拟校区展示。</p><LinkButton to="/booking" go={go} className="button button-primary">预约到校参观 <span>→</span></LinkButton></div></section>;
}

function BookingPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ parent: '', phone: '', age: '', course: '', time: '' });
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const submit = (event) => { event.preventDefault(); setSent(true); };
  return <section className="booking-page page-section">
    <div className="booking-copy"><p className="eyebrow">BOOKING · 预约试听</p><h1>先见面，再决定</h1><p>填写孩子的基本情况，我们会在您方便的时段联系，推荐合适的试听课程。</p><dl><div><dt>01</dt><dd>了解孩子年龄与学习经历</dd></div><div><dt>02</dt><dd>匹配合适课程与班级节奏</dd></div><div><dt>03</dt><dd>到校完成一次真实试听</dd></div></dl></div>
    <div className="booking-panel">{sent ? <div className="success-state"><p className="eyebrow">REQUEST RECEIVED</p><h2>预约信息已记录</h2><p>这是演示网站，不会实际提交数据。正式交付后可接入企业微信、表单系统或客户自己的 CRM。</p><button className="button button-primary" onClick={() => setSent(false)}>再填写一次</button></div> : <form onSubmit={submit}>
      <label>家长称呼<input required value={form.parent} onChange={update('parent')} placeholder="例如：林女士" /></label>
      <label>联系电话<input required pattern="1[3-9][0-9]{9}" value={form.phone} onChange={update('phone')} placeholder="请输入 11 位手机号" /></label>
      <label>孩子年龄<select required value={form.age} onChange={update('age')}><option value="">请选择</option>{[6,7,8,9,10,11,12].map(n => <option key={n}>{n}岁</option>)}</select></label>
      <label>意向课程<select required value={form.course} onChange={update('course')}><option value="">请选择</option>{courses.map(c => <option key={c.key}>{c.title}</option>)}</select></label>
      <label>方便联系时段<select required value={form.time} onChange={update('time')}><option value="">请选择</option><option>工作日 10:00–12:00</option><option>工作日 14:00–18:00</option><option>晚间 18:00–20:00</option><option>周末全天</option></select></label>
      <label className="consent"><input type="checkbox" required /> <span>我同意用于本次课程咨询与试听安排</span></label>
      <button className="button button-primary form-submit" type="submit">提交试听申请 <span>→</span></button><small>演示说明：当前表单仅展示交互，不会保存或发送个人信息。</small>
    </form>}</div>
  </section>;
}

function Callout({ go }) { return <section className="callout page-section" data-reveal><p className="eyebrow">BEGIN WITH A TRIAL</p><h2>一次试听，看看这里是否适合孩子</h2><p>不公开堆叠价格，先了解需求、感受课堂，再给出合适的课程建议。</p><LinkButton to="/booking" go={go} className="button button-primary">预约试听 <span>→</span></LinkButton></section>; }

function ContactDock({ go }) {
  const [wechat, setWechat] = useState(false);
  return <><aside className="contact-dock" aria-label="快捷联系"><a href="tel:4008002026"><strong>电话咨询</strong><small>400-800-2026</small></a><button onClick={() => setWechat(true)}><strong>添加微信</strong><small>获取课程与校区详情</small></button><LinkButton to="/booking" go={go} className="dock-primary"><strong>预约试听</strong><small>填写 1 分钟表单</small></LinkButton><LinkButton to="/booking" go={go}><strong>查看校区</strong><small>示范校区 · 到校参观</small></LinkButton></aside>{wechat && <div className="wechat-modal" role="dialog" aria-modal="true" aria-label="添加微信"><div><button className="modal-close" onClick={() => setWechat(false)}>关闭</button><p className="eyebrow">WECHAT CONSULTATION</p><h2>添加课程顾问微信</h2><p>演示账号：Lanseedance_demo</p><small>正式项目中可替换为商家的企业微信二维码与真实顾问信息。</small></div></div>}</>;
}

function Footer({ go }) { return <footer><LinkButton to="/" go={go} className="footer-brand">澜序舞蹈美育 <small>LANSÉE DANCE</small></LinkButton><p>6–12岁精品小班舞蹈教育 · 品牌概念演示网站</p><div>{navItems.map(item => <LinkButton key={item.path} to={item.path} go={go}>{item.cn}</LinkButton>)}</div></footer>; }

export function App() {
  const [path, go] = useRoute();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    const onScroll = () => document.documentElement.style.setProperty('--scroll-shift', `${Math.min(window.scrollY * .06, 42)}px`);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [path]);
  let page = <HomePage go={go} />;
  if (path === '/courses') page = <CoursesPage go={go} />;
  if (path === '/faculty') page = <FacultyPage go={go} />;
  if (path === '/works') page = <WorksPage go={go} />;
  if (path === '/booking') page = <BookingPage />;
  return <><Header path={path} go={go} /><main>{page}</main><Footer go={go} /><ContactDock go={go} /></>;
}
