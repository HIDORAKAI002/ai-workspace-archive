#!/usr/bin/env python3
"""scaffold_bundle.py — Cria o esqueleto de um bundle OKF (Open Knowledge Format) para uma empresa.

Gera a árvore de pastas das 12 fases, com `index.md` em cada pasta, mais o
`index.md` raiz (painel das fases) e o `log.md` raiz. Arquivos reservados
(index.md / log.md) NÃO recebem `type`, conforme a spec OKF.

As pastas `06-produto` e `08-tech` só são criadas com --has-product / --has-tech.

Determinístico. Sem chamadas de LLM. Apenas stdlib.

Uso:
    python scaffold_bundle.py                      # preview (dry-run) de "Empresa Exemplo"
    python scaffold_bundle.py "Minha Empresa" --out ./minha-empresa
    python scaffold_bundle.py "Acme" --out ./acme --has-product --has-tech
    python scaffold_bundle.py "Acme" --out ./acme --dry-run --output json
    python scaffold_bundle.py --sample             # idem ao primeiro (preview, não escreve)
"""

import argparse
import json
import os
import re
import sys
import unicodedata

# Pastas das fases. (slug, rótulo, condicional?)
FOLDERS = [
    ("00-fundacao", "Fundação", None),
    ("01-estrategia", "Estratégia", None),
    ("02-mercado", "Mercado", None),
    ("03-financeiro", "Financeiro", None),
    ("04-comercial", "Comercial", None),
    ("05-marketing", "Marketing", None),
    ("06-produto", "Produto", "has_product"),
    ("07-operacoes", "Operações", None),
    ("08-tech", "Tech", "has_tech"),
    ("09-pessoas", "Pessoas", None),
    ("10-juridico", "Jurídico", None),
    ("11-governanca", "Governança", None),
]

# Painel: (nº da fase, área) — fase 0 = descoberta, sem pasta própria.
DASHBOARD = [
    (0, "Descoberta"), (1, "Fundação"), (2, "Estratégia"), (3, "Mercado"),
    (4, "Financeiro"), (5, "Comercial"), (6, "Marketing"), (7, "Produto"),
    (8, "Operações"), (9, "Tech"), (10, "Pessoas"), (11, "Jurídico"),
    (12, "Governança"),
]


def slugify(name):
    """minúsculas, sem acento, hífen no lugar de espaço."""
    nfkd = unicodedata.normalize("NFKD", name)
    ascii_only = "".join(c for c in nfkd if not unicodedata.combining(c))
    ascii_only = ascii_only.lower()
    ascii_only = re.sub(r"[^a-z0-9]+", "-", ascii_only).strip("-")
    return ascii_only or "empresa"


def planned_folders(has_product, has_tech):
    flags = {"has_product": has_product, "has_tech": has_tech}
    out = []
    for slug, label, cond in FOLDERS:
        if cond is None or flags.get(cond):
            out.append((slug, label))
    return out


def root_index(name, folders):
    rows = "\n".join(f"| {n} | {area} | ⬜ |" for n, area in DASHBOARD)
    folder_rows = "\n".join(f"| [{slug}]({slug}/index.md) | {label} |" for slug, label in folders)
    return (
        f"# {name} — Bundle OKF\n\n"
        "Empresa documentada como código (Open Knowledge Format v0.1). "
        "Cada arquivo é um conceito; relações são links markdown; `index.md`/`log.md` são reservados.\n\n"
        "## Dados da empresa\n\n"
        f"- **Nome:** {name}\n- **Estágio:** _(a preencher na FASE 0)_\n"
        "- **Modelo:** _(serviço / produto / SaaS / marketplace / híbrido)_\n\n"
        "## Progresso das 12 fases\n\n"
        "| Fase | Área | Status |\n|---|---|---|\n"
        f"{rows}\n\n"
        "Legenda: ✅ feito · 🚧 em andamento · ⬜ pendente.\n\n"
        "**Próximo passo sugerido:** iniciar a FASE 0 (descoberta).\n\n"
        "## Pastas\n\n"
        "| Pasta | Área |\n|---|---|\n"
        f"{folder_rows}\n"
    )


def root_log(name):
    return (
        f"# Log de decisões — {name}\n\n"
        "Histórico append-only. Entrada mais recente no topo. Timestamp ISO 8601.\n\n"
        "## 2026-01-01T00:00:00Z — Bundle criado\n\n"
        "- **O que mudou:** esqueleto OKF gerado por scaffold_bundle.py.\n"
        "- **Decisão:** _(a registrar)_.\n"
        "- **Alternativas descartadas:** _(a registrar)_.\n"
        "- **Motivo:** _(a registrar)_.\n"
    )


def folder_index(label):
    return (
        f"# {label}\n\n"
        "_(1 parágrafo: propósito desta área.)_\n\n"
        "## Conceitos\n\n"
        "| Conceito | O que é | type | status |\n|---|---|---|---|\n"
        "<!-- okf:index:start -->\n"
        "<!-- (sem conceitos ainda — gerado por index_generator.py) -->\n"
        "<!-- okf:index:end -->\n"
    )


def build_plan(name, out_dir, has_product, has_tech):
    """Retorna lista de (caminho_relativo, conteúdo) que seriam escritos."""
    folders = planned_folders(has_product, has_tech)
    files = [
        ("index.md", root_index(name, folders)),
        ("log.md", root_log(name)),
    ]
    for slug, label in folders:
        files.append((f"{slug}/index.md", folder_index(label)))
    return files


def write_plan(out_dir, files, force):
    written, skipped = [], []
    for rel, content in files:
        dest = os.path.join(out_dir, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.exists(dest) and not force:
            skipped.append(rel)
            continue
        with open(dest, "w", encoding="utf-8") as f:
            f.write(content)
        written.append(rel)
    return written, skipped


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    p = argparse.ArgumentParser(
        description="Cria o esqueleto de um bundle OKF para uma empresa.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("name", nargs="?", help="Nome da empresa (omitido = preview de exemplo)")
    p.add_argument("--out", help="Pasta de destino (default: ./<slug-do-nome>)")
    p.add_argument("--has-product", action="store_true", help="Inclui a pasta 06-produto")
    p.add_argument("--has-tech", action="store_true", help="Inclui a pasta 08-tech")
    p.add_argument("--force", action="store_true", help="Sobrescreve arquivos existentes")
    p.add_argument("--dry-run", action="store_true", help="Não escreve; só mostra o plano")
    p.add_argument("--sample", action="store_true", help="Preview de 'Empresa Exemplo' (não escreve)")
    p.add_argument("--output", choices=("text", "json"), default="text")
    args = p.parse_args()

    sample_mode = args.sample or not args.name
    name = args.name or "Empresa Exemplo"
    dry = args.dry_run or sample_mode
    out_dir = args.out or os.path.join(".", slugify(name))

    files = build_plan(name, out_dir, args.has_product, args.has_tech)

    if dry:
        written, skipped = [], []
        action = "PREVIEW (nada escrito)"
    else:
        written, skipped = write_plan(out_dir, files, args.force)
        action = "ESCRITO"

    result = {
        "name": name,
        "out_dir": out_dir,
        "action": action,
        "planned_files": [rel for rel, _ in files],
        "written": written,
        "skipped_existing": skipped,
        "has_product": args.has_product,
        "has_tech": args.has_tech,
    }

    if args.output == "json":
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print("=" * 64)
        print("SCAFFOLD BUNDLE OKF")
        print(f"Empresa: {name}")
        print(f"Destino: {out_dir}   [{action}]")
        print("=" * 64)
        for rel, _ in files:
            mark = "+" if (dry or rel in written) else ("=" if rel in skipped else " ")
            print(f"  [{mark}] {rel}")
        if skipped:
            print(f"\n{len(skipped)} arquivo(s) preservado(s) (use --force para sobrescrever).")
        if dry:
            print("\n(dry-run/sample: nada foi escrito. Rode com um nome + --out para gerar.)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
