import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
// import Job from './Job';


const AppliedJobTable = () => {
  
      console.log(useSelector(store => store.job))
    const {allAppliedJobs} = useSelector(store => store.job);
    

    return (
        <div className='max-w-4xl mx-auto my-5 p-2 sm:p-5 border border-gray-200 rounded-2xl shadow-lg bg-transparent overflow-x-auto'>
        {/* Table pour écrans moyens et larges */}
        <div className="hidden sm:block">
          <Table>
            <TableCaption style={{ color: '#7f99b5' }}>A list of your applied jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead style={{ color: '#7f99b5' }}>Date</TableHead>
                <TableHead style={{ color: '#7f99b5' }}>Job Role</TableHead>
                <TableHead style={{ color: '#7f99b5' }}>Company</TableHead>
                <TableHead className="text-right" style={{ color: '#7f99b5' }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center" style={{ color: '#7f99b5' }}>
                    You haven't applied any job yet.
                  </TableCell>
                </TableRow>
              ) : (
                allAppliedJobs.map((appliedJob) => (
                  <TableRow key={appliedJob._id}>
                    <TableCell style={{ color: '#7f99b5' }}>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell style={{ color: '#7f99b5' }}>{appliedJob.job?.title}</TableCell>
                    <TableCell style={{ color: '#7f99b5' }}>{appliedJob.job?.company?.name}</TableCell>
                    <TableCell className="text-right" style={{ color: 'white' }}>
                      <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                        {appliedJob.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
  
        {/* Vue carte pour petits écrans */}
        <div className="block sm:hidden">
          <h2 className="text-center mb-4" style={{ color: '#7f99b5' }}>Applied Jobs</h2>
          {allAppliedJobs.length <= 0 ? (
            <div className="text-center p-4" style={{ color: '#7f99b5' }}>
              You haven't applied any job yet.
            </div>
          ) : (
            <div className="space-y-4">
              {allAppliedJobs.map((appliedJob) => (
                <div
                  key={appliedJob._id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium" style={{ color: '#7f99b5' }}>
                      {appliedJob.job?.title}
                    </div>
                    <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div style={{ color: '#7f99b5' }}>{appliedJob.job?.company?.name}</div>
                  <div className="text-sm mt-2" style={{ color: '#7f99b5' }}>
                    {appliedJob?.createdAt?.split("T")[0]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    
    )
}

export default AppliedJobTable