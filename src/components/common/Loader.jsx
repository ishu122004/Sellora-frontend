//displays a loading state like Loading...
export default function Loader(){
    return(
        
            <div className="flex min-h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"/>
            </div>
      
    )
}