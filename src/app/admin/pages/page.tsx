import { Plus, Pencil, Copy, Eye } from 'lucide-react';

function PagesTable({ pages }: { pages: Page[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>País</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell>{page.slug}</TableCell>
              <TableCell>{page.country_code?.toUpperCase()}</TableCell>
              <TableCell>
                <Badge
                  variant={page.is_active ? 'default' : 'secondary'}
                >
                  {page.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(page.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/${page.slug}`}
                    target="_blank"
                    className={buttonVariants({ variant: 'outline', size: 'icon' })}
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/pages/clone/${page.id}`}
                    className={buttonVariants({ variant: 'outline', size: 'icon' })}
                  >
                    <Copy className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/content/edit/page/${page.id}`}
                    className={buttonVariants({ variant: 'outline', size: 'icon' })}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 