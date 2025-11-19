// app/page.tsx
import css from './Home.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <div>
        <h1 className={css.title}>Welcome to NoteHub</h1>

        <p className={css.description}>
          NoteHub — простое и эффективное приложение для управления личными заметками. 
          Оно помогает хранить ваши мысли организованно и в одном месте, где бы вы ни находились: дома или в дороге.
        </p>

        <p className={css.description}>
          Приложение предоставляет понятный интерфейс для написания, редактирования и просмотра заметок. 
          Благодаря поддержке поиска по ключевым словам и структурированной организации, NoteHub предлагает 
          удобный интерфейс для всех, кто ценит ясность и продуктивность.
        </p>
      </div>
    </main>
  );
}
