import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { RpcArgumentsHost } from "@nestjs/common/interfaces";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { calcLastPage } from '../helpers/index.helper';

@Injectable()
export class TransformPaginationInterceptor implements NestInterceptor {
  private pageName: string;
  private perPageName: string;
  constructor (pageName: string = 'page', perPageName: string = 'perPage') {
    this.pageName = pageName;
    this.perPageName = perPageName;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcArgsHost: RpcArgumentsHost = context.switchToRpc()
    const data = rpcArgsHost.getData()
    console.log('rpc arg host data', data);
    return next.handle().pipe(map(result => {
      const {data, total, page, perPage} = result;
      const lastPage = calcLastPage(total, perPage);

      return {
        page,
        perPage,
        total,
        lastPage,
        data: data || []
      }
    }));
  }
}
