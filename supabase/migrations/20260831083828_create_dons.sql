-- Table des dons financiers (ponctuels et mensuels)
create table public.dons (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  montant_centimes integer not null check (montant_centimes > 0),
  type_don text not null check (type_don in ('ponctuel', 'mensuel')),
  statut text not null default 'en_attente' check (statut in ('en_attente', 'valide', 'echoue', 'rembourse')),
  helloasso_checkout_id text unique,
  recu_fiscal_genere boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS activée : sans ça, la clé publique donnerait accès à tous les dons
alter table public.dons enable row level security;

-- Un utilisateur ne peut lire que ses propres dons
create policy "Un utilisateur peut lire ses propres dons"
  on public.dons for select
  using (auth.uid() = profile_id);

-- Aucune policy insert/update pour les utilisateurs :
-- l'écriture se fera uniquement via le webhook HelloAsso (clé secrète, côté serveur),
-- pas encore implémenté à ce stade — la table est prête à le recevoir.