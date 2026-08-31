-- Table de profil, complète auth.users (gérée nativement par Supabase)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  prenom text,
  nom text,
  role text not null default 'membre',
  accepte_communications boolean not null default false,
  created_at timestamptz not null default now()
);

-- Active la Row Level Security : sans ça, la clé publique donnerait
-- un accès total à cette table depuis le navigateur
alter table public.profiles enable row level security;

-- Un utilisateur ne peut lire que son propre profil
create policy "Un utilisateur peut lire son propre profil"
  on public.profiles for select
  using (auth.uid() = id);

-- Un utilisateur ne peut modifier que son propre profil
create policy "Un utilisateur peut modifier son propre profil"
  on public.profiles for update
  using (auth.uid() = id);