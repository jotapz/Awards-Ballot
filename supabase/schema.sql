-- Awards Ballot :: schema do Supabase
-- Rode este arquivo no SQL Editor do Supabase (Dashboard > SQL Editor > New query).

create table if not exists editions (
  id          uuid primary key default gen_random_uuid(),
  award       text not null check (award in ('oscar', 'grammys', 'golden-globes')),
  year        int  not null,
  name        text not null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  unique (award, year)
);

create table if not exists categories (
  id                       uuid primary key default gen_random_uuid(),
  edition_id               uuid not null references editions(id) on delete cascade,
  name                     text not null,
  explanation              text,
  last_winner_description  text,
  position                 int  not null default 0
);

create table if not exists nominees (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid not null references categories(id) on delete cascade,
  name         text not null,
  description  text,
  position     int  not null default 0
);

create index if not exists categories_edition_idx on categories (edition_id, position);
create index if not exists nominees_category_idx  on nominees (category_id, position);

-- Apenas uma edicao ativa por premiacao.
create unique index if not exists editions_one_active_per_award
  on editions (award) where is_active;

-- RLS ligado: o app le e escreve pela service role key no servidor,
-- entao nenhuma policy publica e necessaria.
alter table editions   enable row level security;
alter table categories enable row level security;
alter table nominees   enable row level security;
